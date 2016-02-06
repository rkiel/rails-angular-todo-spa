module AngularCsrfProtection

#  XSRF is a technique by which an unauthorized site can gain your user's private data.!
#  Angular provides a mechanism to counter XSRF.
#  When performing XHR requests, the $http service reads a token from a cookie (by default, XSRF-TOKEN) and sets it as an HTTP header (X-XSRF-TOKEN).
#  Since only JavaScript that runs on your domain could read the cookie, your server can be assured that the XHR came from JavaScript running on your domain.
#  The header will not be set for cross-domain requests.

# To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called XSRF-TOKEN on the first HTTP GET request.
# On subsequent XHR requests the server can verify that the cookie matches X-XSRF-TOKEN HTTP header, and therefore be sure that only JavaScript running on your domain could have sent the request.
# The token must be unique for each user and must be verifiable by the server (to prevent the JavaScript from making up its own tokens).
# We recommend that the token is a digest of your site's authentication cookie with a salt for added security.

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

protected

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
