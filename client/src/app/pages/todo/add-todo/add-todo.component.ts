import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  myTodo : FormGroup;
  todo : Todo;
  
  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private router: Router) { }

  ngOnInit(): void {
    this.myTodo = this.fb.group({
      title: [''],
      userId: [''],
      isComplete: [''],
      date: [''],
      time: ['']
    });

    this.todo = {
      id: null,
      userId: '',
      title:'',
      date: '',
      time: '',
      isComplete: false,
    }
  }


  saveTodo() : void {
    this.todoService.createTodo(this.myTodo.value).subscribe({
      next:result => {
                      this.router.navigate(['todos']);
                      console.log(JSON.stringify(result))},
      error: err => console.log(err)
    })
  }

}
