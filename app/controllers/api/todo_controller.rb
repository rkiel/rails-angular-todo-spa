class API::TodoController < ApplicationController
  respond_to :json

  before_filter :ensure_login_session

  def create
    todo = Todo.new(todo_params)
    todo.uuid = current_token.uuid

    if todo.save
      todos = lookup
      render json: todos, status: :ok
    else
      render json: todo.errors, status: :bad_request
    end
  end

  def destroy
    todo = Todo.find_by(id: params[:id])
    if todo
      todo.destroy
      todos = lookup
      render json: todos, status: :ok
    else
      render json: todo.errors, status: :bad_request
    end
  end

  def index
    todos = lookup
    render json: todos, status: :ok
  end

private

  def todo_params
    params.require(:todo).permit(:description)
  end

  def lookup
    Todo.where(uuid: current_token.uuid).order(updated_at: :desc)
  end

end
