import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { structlog } from 'structlog';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const logger = structlog.getLogger('ai-core');

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface EmbeddingOptions {
  model?: string;
}

export class AICore {
  private chatModel: ChatOpenAI;
  private embeddings: OpenAIEmbeddings;
  private tracer = trace.getTracer('ai-core');

  constructor(apiKey: string) {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-4',
      temperature: 0.7,
    });

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: apiKey,
      modelName: 'text-embedding-ada-002',
    });
  }

  async chatCompletion(
    prompt: string,
    options: ChatCompletionOptions = {}
  ): Promise<string> {
    const span = this.tracer.startSpan('chat_completion');
    
    try {
      const response = await this.chatModel.call(prompt, {
        temperature: options.temperature ?? 0.7,
        maxTokens: options.maxTokens,
        streaming: options.stream ?? false,
      });

      span.setStatus({ code: SpanStatusCode.OK });
      return response.content;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR });
      logger.error('chat_completion_error', { error });
      throw error;
    } finally {
      span.end();
    }
  }

  async getEmbeddings(
    text: string | string[],
    options: EmbeddingOptions = {}
  ): Promise<number[][]> {
    const span = this.tracer.startSpan('get_embeddings');
    
    try {
      const embeddings = await this.embeddings.embedDocuments(
        Array.isArray(text) ? text : [text]
      );
      
      span.setStatus({ code: SpanStatusCode.OK });
      return embeddings;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR });
      logger.error('embeddings_error', { error });
      throw error;
    } finally {
      span.end();
    }
  }

  async parseStructuredOutput<T extends z.ZodType>(
    prompt: string,
    schema: T,
    options: ChatCompletionOptions = {}
  ): Promise<z.infer<T>> {
    const span = this.tracer.startSpan('parse_structured_output');
    
    try {
      const parser = StructuredOutputParser.fromZodSchema(schema);
      const formatInstructions = parser.getFormatInstructions();
      
      const fullPrompt = `${prompt}\n${formatInstructions}`;
      const response = await this.chatCompletion(fullPrompt, options);
      
      const parsed = await parser.parse(response);
      span.setStatus({ code: SpanStatusCode.OK });
      
      return parsed as z.infer<T>;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR });
      logger.error('structured_output_error', { error });
      throw error;
    } finally {
      span.end();
    }
  }

  createPromptTemplate(template: string, inputVariables: string[]): PromptTemplate {
    return new PromptTemplate({
      template,
      inputVariables,
    });
  }
}

// Export commonly used schemas
export const schemas = {
  learningPath: z.object({
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    goals: z.array(z.string()),
    weeklyHours: z.number(),
    modules: z.array(z.object({
      title: z.string(),
      description: z.string(),
      duration: z.number(),
      resources: z.array(z.object({
        title: z.string(),
        url: z.string(),
        type: z.enum(['article', 'video', 'course', 'book']),
      })),
    })),
  }),
  
  dealAnalysis: z.object({
    address: z.string(),
    purchasePrice: z.number(),
    arv: z.number(),
    rehabCost: z.number(),
    holdingCosts: z.number(),
    roi: z.number(),
    cashOnCash: z.number(),
    capRate: z.number(),
    comps: z.array(z.object({
      address: z.string(),
      price: z.number(),
      sqft: z.number(),
      distance: z.number(),
    })),
  }),
}; 