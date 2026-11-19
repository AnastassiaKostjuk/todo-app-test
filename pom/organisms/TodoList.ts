import { Page, expect, Locator} from '@playwright/test'
import { TodoItem} from "../atoms/TodoItem";

export class TodoList{
    readonly page: Page;
    readonly main: Locator;
    readonly todoItems: Locator;
    readonly itemCount: Locator;
    readonly clearCompletedButton: Locator;
    readonly todoInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.main = page.getByTestId('main');
        this.todoItems = this.main.getByTestId('todo-item');
        this.itemCount = page.locator('.todo-count');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.todoInput = page.getByTestId('text-input')
    }

    async addTodo(text: string): Promise<void>{
        await this.todoInput.fill(text);
        await this.todoInput.press('Enter');
    }

    getTodoItem(index: number = 0): TodoItem{
        return new TodoItem(this.todoItems.nth(index))
    }


    async clearCompleted(): Promise<void> {
        await this.clearCompletedButton.click();
    }

    async expectTodoCount(count: number): Promise<void>{
        await expect(this.todoItems).toHaveCount(count);
    }

    async expectTodoText(text: string): Promise<void>{
        await expect(this.todoItems).toContainText(text);
    }
}