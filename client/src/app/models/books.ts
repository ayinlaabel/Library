import { Chapter } from './chapter';

export interface Books {
    id: number,
    title: string,
    author: string,
    summary: string,
    chapter?: Chapter
}
