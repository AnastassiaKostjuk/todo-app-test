import { Locator } from '@playwright/test'

export class TodoItem{
    readonly locator: Locator;
    readonly toggleButton: Locator;
    readonly deleteButton: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
        this.toggleButton = locator.getByTestId('todo-item-toggle');
        this.deleteButton = locator.locator('.destroy');
    }

    async activate(): Promise<void> {
        await this.toggleButton.click();
    }

    async delete(): Promise<void> {
        await this.locator.hover();
        await this.deleteButton.click();
    }
}