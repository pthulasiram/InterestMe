class Api::PinsController < ApplicationController
  helper_method :current_user, :pin_sets

  def index
    @pins = Pin.feed_for(current_user)
    @pins.map do |pin|
      pin['owner'] = current_user.id == pin['user_id']
    end
    render :index
  end

  def new
    @pin = Pin.new()
    user_id = current_user.id
    @boards = User.find(user_id).boards
    render '/api/boards/show'
  end

  def create
    new_pin = Pin.new(pin_params)
    new_pin.user_id = current_user.id
    if new_pin.save
      @pin = new_pin
      render :new
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def update
    @pin = Pin.find(params[:id])
    if @pin.update_attributes(pin_params)
      render :show
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  def show
    @pins = Board.pins(params[:id])
    @pins.map do |pin|
      pin['owner'] = current_user.id == pin['user_id']
    end
    render :show
  end

  def destroy
    @pin = Pin.find(params[:id])
    if @pin
      @pin.destroy
      render :index
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:board_id, :image_url, :title, :body, :title, :id)
  end
end
