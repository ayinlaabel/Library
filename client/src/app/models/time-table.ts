import { Day } from "./day";
import { Time } from "./time";
import { Todo } from "./todo";

export interface TimeTable {
    id: number,
    days: Day,
    time: Time
    todo: Todo
}
