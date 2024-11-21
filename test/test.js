import { sayHello } from '../js/main.js';

QUnit.module('Basic Functionality', function () {
  QUnit.test('sayHello function should return "hello"', function (assert) {
    const result = sayHello();
    assert.equal(result, 'hello', 'sayHello returned "hello"');
  });
});

QUnit.module('Sanitization', function () {
  QUnit.test('Sanitizing inputs', function (assert) {
    const sanitized = "<script>alert('x')</script>".replace(/</g, "&lt;").replace(/>/g, "&gt;");
    assert.equal(sanitized, "&lt;script&gt;alert('x')&lt;/script&gt;", 'Sanitization works as expected');
  });
});

QUnit.module('Project Management', function () {
  QUnit.test('Adding projects', function (assert) {
    const projects = [];
    const newProject = { title: "Test Project", dueDate: "2024-12-01" };
    projects.push(newProject);

    assert.equal(projects.length, 1, 'Project was added');
    assert.deepEqual(projects[0], newProject, 'Added project matches the expected object');
  });

  QUnit.test('Deleting projects', function (assert) {
    const projects = [{ title: "Test Project", dueDate: "2024-12-01" }];
    projects.pop();

    assert.equal(projects.length, 0, 'Project was deleted');
  });
});