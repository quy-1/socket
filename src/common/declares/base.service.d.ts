export declare class BaseService<T> {
  actionCreate(data: T): Promise<any>;
  actionFindByIdAndUpdate(id: string, data: T): Promise<T>;
  actionFindById(id: string): Promise<T>;
  actionCreateMany(data: T[]): Promise<T[]>;
  actionGetAll(): Promise<T[]>;
  actionDeleteAll(): Promise<any>;
}
