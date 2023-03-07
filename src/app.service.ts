import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HOWRARE_COLLECTIONS_API } from './helper/constants.helper';
import { logger } from './helper/logger.helper';
import { ERROR_LIST } from './helper/error.helper';

@Injectable()
export class AppService {
  async getCollections() {
    try {
      let list = [];
      const res = (await axios.get(HOWRARE_COLLECTIONS_API)).data;
      if (res.result && res.result.api_response === 'Success')
        list = res.result.data;

      return { statusCode: 200, error: null, message: null, data: list };
    } catch (e) {
      logger.error(`Get collections: ${e}`);

      return {
        statusCode: 500,
        error: 'error',
        message: [ERROR_LIST.SOMETHING_WENT_WRONG],
        data: null,
      };
    }
  }
}