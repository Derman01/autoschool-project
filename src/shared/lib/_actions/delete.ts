import { Server } from 'shared/lib/source';
import { AnyObject } from './helper';

export const deleteData = (Source: Server, params: AnyObject) => {
    return Source.delete(params);
};
