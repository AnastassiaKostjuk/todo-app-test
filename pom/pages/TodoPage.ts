import {Page, Locator} from "@playwright/test";
import {TodoList} from "../organisms/TodoList";

export class TodoPage{
    readonly page: Page;
    readonly todoList: TodoList;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly allFilter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoList = new TodoList(page);
        this.activeFilter = page.getByRole('link', {name: 'Active'});
        this.completedFilter = page.getByRole('link', {name: 'Completed'});
        this.allFilter = page.getByRole('link', {name: 'All'});
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async showActive(): Promise<void> {
        await this.activeFilter.click();
    }

    async showCompleted(): Promise<void> {
        await this.completedFilter.click();
    }

    async showAll(): Promise<void> {
        await this.allFilter.click();
    }
}