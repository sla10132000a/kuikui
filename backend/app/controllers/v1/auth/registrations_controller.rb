class V1::Auth::RegistrationsController < ApplicationController

    private

    def sign_up_params
      # require(:registration)を追加
      params.require(:registration).permit(:name, :email, :password, :password_confirmation)
    end
  
    def account_update_params
      params.permit(:name, :email)
    end
end
