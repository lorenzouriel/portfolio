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
## Editing portfolio sections

Each section uses Markdown files with the same front matter and the same UI:

- `_posts/`: Projects (existing Jekyll posts).
- `_writing/`: Articles.
- `_studying/`: Certifications.
- `_reading/`: Books.

Duplicate a Markdown file in the appropriate folder, then edit `title`, `date`, `position` (`left` or `right`), `featured_image`, `lead_text`, `tags`, `project_link`, `button_icon`, and `button_text`. Portuguese overrides are `title_pt`, `lead_text_pt`, and `button_text_pt`.

For certifications, use `status: earned` or `status: planned`; for books, `status: current` or `status: finished`. Include the status in tags to display it. Remove `example: true` when replacing a sample with your own entry. Entries appear newest first. Restart Jekyll after collection configuration changes.

### Medium archive import

The Writing collection includes published links from the 2024-2026 local content archive. Entries without published URLs were skipped. Entries whose covers could not be retrieved use the Writing illustration and have `cover_status: pending` in their Markdown files.

To replace a pending cover, save the image in `img/writing/` with the same basename as its Markdown entry, update `featured_image`, and remove `cover_status`. The article metadata remains editable in `_writing/`.

Books use the numeric `order` field in `_reading/` (lowest first). Current reads come first, followed by data engineering, database, and product books. Other sections remain sorted by date.
