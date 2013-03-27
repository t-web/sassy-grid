dir = File.dirname(__FILE__) # path to this file
root_dir = File.expand_path('..', dir); #path to parent

# environment
environment = :development # :production

# Set this to the root of your project when deployed:
http_path = root_dir
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

asset_cache_buster :none


sass_demos_dir = root_dir + "/assets/sass/demos/*" # source folder of demo scss
sass_cp_dir = root_dir + "/_includes/scss/" # folder to copy the demo scss to
css_cp_dir = root_dir + "/_includes/css/" # folder to copy the output css into

# Copying compiled CSS to the _includes folder
on_stylesheet_saved do |filename|
    if File.exists?(filename)
        FileUtils.cp filename, css_cp_dir
    end
end

# Copying demo SCSS to the _includes folder
FileUtils.cp_r(Dir[sass_demos_dir],sass_cp_dir)
