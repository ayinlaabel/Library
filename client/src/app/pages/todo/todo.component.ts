import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  _listFilter: string;
  filteredTodo: Todo[];

  get listFilter(): string  {
    return this._listFilter
  }

  set listFilter(value: string) {

    this._listFilter = value
    this.filteredTodo = this.listFilter ? this.performFilter(this.listFilter) : this.todos

  }

  constructor(private todoService: TodoService,
              private router: Router) { }


  performFilter(filterBy: string) : Todo[]{
      filterBy = filterBy.toLocaleLowerCase()
      return this.todos.filter((todos: Todo) => 
              todos.title.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }


  ngOnInit(): void {
    this.todoService.getTodo().subscribe({
      next: todos => {
                        this.todos = todos
                        this.filteredTodo = this.todos
                      },
      error: err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500){
            this.router.navigate(['/login']);
          }
        }
      }
    })
  }

 

}
