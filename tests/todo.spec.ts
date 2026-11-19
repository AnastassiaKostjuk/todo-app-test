import { test, expect } from '@playwright/test';
import { TodoPage } from "../pom/pages/TodoPage";

test.describe("ToDo app tests", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
  })

  test('TL-19-1 Create one Todo item', async ({ page }) => {
    await todoPage.todoList.expectTodoCount(0);
    await todoPage.todoList.addTodo('test todo item');
    await expect(todoPage.todoList.todoItems).toBeVisible();
  });

  test('TL-19-2 Create two Todo items', async ({ page }) => {
    await expect(todoPage.todoList.todoItems).not.toBeVisible();

    await todoPage.todoList.addTodo('test todo item');
    await todoPage.todoList.addTodo('test todo item 2');
    await todoPage.todoList.expectTodoCount(2);
    await expect(todoPage.todoList.itemCount).toContainText('2');

    /*
    const countText = await itemCountSpan.innerText();
    const splitResult = countText.split(' ');
    const countNumber = Number(splitResult[0]);
    expect(countNumber).toBe(2);

    expect(countText.includes('2')).toBeTruthy();
    */
  });

  test('TL-19-3 Create two Todo items -> activate 1 -> click "clear completed"', async ({ page }) => {
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('test todo item 1');
    await todoPage.todoList.addTodo('test todo item 2')
    await todoPage.todoList.expectTodoCount(2);
    await expect(todoPage.todoList.itemCount).toContainText('2');

    await todoPage.todoList.getTodoItem(0).activate();
    await expect(todoPage.todoList.itemCount).toContainText('1');
    await todoPage.todoList.expectTodoCount(2);

    await todoPage.todoList.clearCompleted();
    await expect(todoPage.todoList.itemCount).toContainText('1');
    await todoPage.todoList.expectTodoCount(1);
  });

  test('TL-19-4 Create two Todo items -> set active filter -> activate 1 -> check 1 on completed filter', async ({ page }) => {
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('activated')
    await todoPage.todoList.addTodo('not activated');
    await todoPage.todoList.expectTodoCount(2);

    await todoPage.showActive();
    await todoPage.todoList.getTodoItem(0).activate();
    await expect(todoPage.todoList.itemCount).toContainText('1');
    await todoPage.todoList.expectTodoCount(1);
    await todoPage.todoList.expectTodoText('not activated');

    await todoPage.showCompleted();
    await todoPage.todoList.expectTodoCount(1);
    await todoPage.todoList.expectTodoText('activated');
  });

  test('TL-19-5 Create one Todo item -> activate it', async ({ page }) => {
    // add test
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('test todo item');
    await expect(todoPage.todoList.todoItems).toBeVisible();

    await todoPage.todoList.getTodoItem(0).activate();
    await expect(todoPage.todoList.getTodoItem(0).locator).toHaveClass(/completed/);
  });

  test('TL-19-6 Create one Todo item -> delete it', async ({ page }) => {
    // add test
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('test todo item');
    await expect(todoPage.todoList.todoItems).toBeVisible();
    await todoPage.todoList.getTodoItem(0).delete();
    await todoPage.todoList.expectTodoCount(0);
  });

  test('TL-19-7 check "ALL"', async ({ page }) => {
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('completed item');
    await todoPage.todoList.addTodo('active item');
    await todoPage.todoList.expectTodoCount(2);

    await todoPage.todoList.getTodoItem(0).activate();
    await todoPage.showActive();
    await expect(todoPage.todoList.itemCount).toContainText('1');
    await todoPage.todoList.expectTodoCount(1);
    await todoPage.todoList.expectTodoText('active item');

    await todoPage.showCompleted();
    await todoPage.todoList.expectTodoCount(1);
    await todoPage.todoList.expectTodoText('completed item');

    await todoPage.showAll();
    await expect(todoPage.todoList.itemCount).toContainText('1'); // check that it shows "1 item left"
    await todoPage.todoList.expectTodoCount(2) // check that visually there are still 2 items since we didn`t delete any, only moved one to completed
    await expect(todoPage.todoList.todoItems.nth(0)).toContainText('completed item');
    await expect(todoPage.todoList.todoItems.nth(1)).toContainText('active item');
  })

  test('TL-19-8 Check "ACTIVE"', async ({ page }) => {
    await expect(todoPage.todoList.todoItems).not.toBeVisible();
    await todoPage.todoList.addTodo('active item');
    await expect(todoPage.todoList.todoItems).toHaveCount(1);

    await todoPage.showActive();
    await expect(todoPage.todoList.itemCount).toContainText('1');
    await todoPage.todoList.expectTodoCount(1);
    await todoPage.todoList.expectTodoText('active item');
  })
});

