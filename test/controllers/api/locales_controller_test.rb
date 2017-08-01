require 'test_helper'

class Api::LocalesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_local = api_locales(:one)
  end

  test "should get index" do
    get api_locales_url
    assert_response :success
  end

  test "should get new" do
    get new_api_local_url
    assert_response :success
  end

  test "should create api_local" do
    assert_difference('Api::Local.count') do
      post api_locales_url, params: { api_local: {  } }
    end

    assert_redirected_to api_local_url(Api::Local.last)
  end

  test "should show api_local" do
    get api_local_url(@api_local)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_local_url(@api_local)
    assert_response :success
  end

  test "should update api_local" do
    patch api_local_url(@api_local), params: { api_local: {  } }
    assert_redirected_to api_local_url(@api_local)
  end

  test "should destroy api_local" do
    assert_difference('Api::Local.count', -1) do
      delete api_local_url(@api_local)
    end

    assert_redirected_to api_locales_url
  end
end
