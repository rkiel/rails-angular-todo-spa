class ApplicationController < ActionController::Base

  include AngularCsrfProtection

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie_for_ng

  def current_token
    @current_token ||= JsonWebToken.user_from(JsonWebToken.decode(session[:jwt_token])) if session[:jwt_token]
  end

  helper_method :current_token

  def ensure_login_session
    render json: nil, status: :unauthorized unless current_token
  end

end
