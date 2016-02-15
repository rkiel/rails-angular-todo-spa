class API::TodoController < ApplicationController
  respond_to :json

  before_filter :ensure_login_session

  def index
    items = [];

    render json: items, status: :ok
  end

private

  def todo_params
    params.require(:todo).permit(:description)
  end

end
