wikipedia-corpus-maker
======================

wikipedia-corpus-maker is a generator of corpus based on the content of wikipedia.

Install
-------

### Mac OS X

MacPorts

~~~bash
sudo port install phantomjs
~~~

Homebrew

~~~bash
brew install phantomjs
~~~

### Linux

Gentoo

~~~bash
emerge -av www-client/phantomjs
~~~

### Other

Follow the official website of [PhantomJS](http://phantomjs.org)

Usage
-----

Create url lists for parsing.

~~~bash
echo "http://en.wikipedia.org/wiki/Toulouse" >> en.txt
~~~

Run Crawler for English corpus

~~~bash
./crawler.sh en
~~~

License
-------

Code released under [the MIT license](LICENSE.md).
