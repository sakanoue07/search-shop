class Api::V1::SearchController < ApplicationController
    require 'active_support/core_ext'
    require 'open-uri'
    def location
        lat = params[:loca][:lat]
        lon = params[:loca][:lon]
        range = params[:loca][:range]
        logger.debug(lon)
        # xmlをjsonに変換
        hash = Hash.from_xml open("http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=6f9c9c79da07d743&lat=#{lat}&lng=#{lon}&range=#{range}&order=4&count=100").read
        # hash = Hash.from_xml open("http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=6f9c9c79da07d743&lat=34.9836586&lng=135.94994069999998&range=5&order=4").read
        json = hash.to_json
        # jsonを返す
        render json: json
    end
end