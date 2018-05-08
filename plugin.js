/**
 * Created by Nicolas on 6/19/15.
 */
/**
*  Modified by Dreadfull on 8/09/17
*/
/**
 * Changed to translate from Chinese to Pinyin by Yang Zhang on 05/08/18
 */
(function (Plugin) {
    'use strict';

    var convert = require('convert-chinese-to-pinyin');

    function slugify (text) {

        var slug = text.toLowerCase();
        if(slug.match(/\/(.*)/)){
            var content = slug.replace(/(.+\/)(.*)$/, '$2');
            content = convert(content).toLowerCase();
            slug = slug.replace(/(.+\/)(.*)$/, `$1${content}`);
        }
        return slug;
    }

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: {
            categoryCreate: function (categoryData, callback) {
                categoryData.category.slug = slugify(categoryData.category.slug);
                callback(null, categoryData);
            },

            categoryUpdate: function (categoryData, callback) {
                if ('slug' in categoryData.category) {
                    categoryData.category.slug = slugify(categoryData.category.slug);
                }
                callback(null, categoryData);
            },

            topicCreate: function (topicData, callback) {
                topicData.topic.slug = slugify(topicData.topic.slug);
                callback(null, topicData);
            },

            topicEdit: function (topicData, callback) {
                //Here was a problem
                topicData.topic.slug = slugify(topicData.topic.slug);
                callback(null, topicData);
            },

            userCreate: function (userData, callback) {
                //If there will be username collision, userslug will be overridden by NodeBB...
                userData.userslug = slugify(userData.userslug);
                callback(null, userData);
            }
        }
    };

})(module.exports);
