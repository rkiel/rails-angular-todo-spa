class API::SignupController < ApplicationController
  respond_to :json

  def create
    user = User.new(user_params)
    user.uuid = SecureRandom.uuid
    if User.find_by(email: user.email)
      render json: [], status: :conflict
    elsif user.save
      render json: user, status: :ok, except: User.private_fields
    else
      render json: user.errors, status: :bad_request
    end
  end

private

  def user_params
    params.require(:user).permit(:first, :last, :email, :password, :password_confirmation)
  end

end
