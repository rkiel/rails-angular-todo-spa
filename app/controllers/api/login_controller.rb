class API::LoginController < ApplicationController
  respond_to :json

  def create
    requesting_user = User.new(user_params)

    actual_user = User.find_by(email: requesting_user.email)
    # If the user exists AND the password entered is correct.
    if actual_user && actual_user.authenticate(requesting_user.password)
      session[:jwt_token] = JsonWebToken.encode(JsonWebToken.payload_for(actual_user))
      render json: actual_user, status: :ok, except: User.private_fields
    else
      render json: [], status: :unauthorized
    end
  end

private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
