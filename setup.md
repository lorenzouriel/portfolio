# Local Setup
This guide explains how to set up a local environment to run a Jekyll site on Ubuntu (or WSL), including Ruby installation, Jekyll setup, system dependencies, and how to fix common errors.

## Prerequisites
Make sure you have:
- Ubuntu or WSL with Ubuntu
- Internet access
- A terminal with `sudo` permissions

## Step-by-Step Instructions
### 1. Install Ruby and system build tools
```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev
```

### 2. Configure your environment to install Ruby gems in your home directory
```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Install Bundler and Jekyll
```bash
gem install bundler jekyll
```

### 4. Navigate to your project directory
```bash
cd ~/portfolio
```

### 5. Install the gems defined in your `Gemfile`
```bash
bundle install
```

### 6. Fix `kramdown-parser-gfm` error (if it occurs)
If you see an error like:
```
Dependency Error: Yikes! It looks like you don't have kramdown-parser-gfm...
```

Install the missing parser:
```bash
bundle add kramdown-parser-gfm
```

### 7. Run the Jekyll local server
```bash
bundle exec jekyll serve
```

You should see output like:
```bash
Server running... press ctrl-c to stop.
Server address: http://127.0.0.1:4000/
```

Open [http://127.0.0.1:4000](http://127.0.0.1:4000) in your browser to view the site.

## References
* [Jekyll Documentation](https://jekyllrb.com/docs/)
* [Jekyll Installation on Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/)