import { pipeline } from '@xenova/transformers';

class SummaryPipeline{
    static task = 'summarization';
    static model = 'Xenova/distilbart-cnn-6-6';
    static instance = null;
  
    static async getInstance(progress_callback = null) {
      if (this.instance === null) {
  
        // NOTE: Uncomment this to change the cache directory
        // env.cacheDir = './.cache';
  
        this.instance = pipeline(this.task, this.model, { progress_callback });
      }
  
      return this.instance;
    }
  }

export default SummaryPipeline;