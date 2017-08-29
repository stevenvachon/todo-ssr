'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require('./validation');

var _caseConverter = require('case-converter');

// TODO :: https://github.com/tgriesser/knex/issues/2084

const addTodoSchema = {
  description: _validation.fields.string().label('To-do description'),
  name: _validation.fields.string().required().label('To-do name'),
  userId: _validation.fields.number().required().label('User ID')
};

const getTodosSchema = {
  userId: _validation.fields.number().required().label('User ID')
};

const removeTodoSchema = {
  id: _validation.fields.number().required().label('To-do ID')
};

const updateTodoSchema = {
  description: _validation.fields.string().label('To-do description'),
  id: _validation.fields.number().required().label('To-do ID'),
  name: _validation.fields.string().required().label('To-do name')
};

exports.default = db => {

  const addTodo = async (name, description, userId) => {
    await (0, _validation.validate)({ name, description, userId }, addTodoSchema);
    return await db.table('todos').insert((0, _caseConverter.toSnakeCase)({ name, description, userId }));
  };

  const getTodos = async userId => {
    await (0, _validation.validate)({ userId }, getTodosSchema);
    return await db.table('todos').where((0, _caseConverter.toSnakeCase)({ userId })).orderBy('id', 'asc');
  };

  const removeTodo = async id => {
    await (0, _validation.validate)({ id }, removeTodoSchema);
    return await db.table('todos').where({ id }).del();
  };

  const updateTodo = async (name, description, id) => {
    await (0, _validation.validate)({ name, description, id }, updateTodoSchema);
    return await db.table('todos').where({ id }).update({ name, description });
  };

  return { addTodo, getTodos, removeTodo, updateTodo };
};