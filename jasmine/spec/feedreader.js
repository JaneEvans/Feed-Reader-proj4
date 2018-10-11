/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite of 'RSS Feeds' */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty. */
        it('has a valid URL', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty. */
        it('has a valid name', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });

    /* A test suite of 'The menu' */
    describe('The menu', function() {
        const body = $('body')[0];

        /* A test that ensures the menu element is hidden by default. */
        it('is hidden', function() {
            expect(body).toHaveClass('menu-hidden'); //!!require jasmine 3.2.1 or higher 
        });

         /* A test that ensures the menu changes visibility when the menu icon is clicked. */
         it('toggles on and off', function() {
            const menu = $('.menu-icon-link');

            menu.click();
            expect(body).not.toHaveClass('menu-hidden');

            menu.click();
            expect(body).toHaveClass('menu-hidden');

         });
    });


    /* A test suite of "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('complete its work', function() {
            const feedEntries = $('.feed .entry');
            expect(feedEntries.length > 0).toBe(true);
        });
    });


    /* A test suite of "New Feed Selection" */
    describe('New Feed Selection', function() {
         let feed0, feed1, feed0List = [], feed1List = [];

        /* A test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. */
        beforeEach(function(done) {
            loadFeed(0, function() {                 //first time load feeds
                feed0 = $('.feed')[0].children;
                for(let feed of feed0){
                    feed0List.push(feed.innerText);
                }

                loadFeed(1, function() {            //second time load feeds after first time load feeds is done;
                    feed1 = $('.feed')[0].children;
                    for(let feed of feed1){
                        feed1List.push(feed.innerText);
                    }
                }); 
            });

        });

        it('loads new content', function() {
            for(i=0; i<feed1List.length; i++){
                expect(feed0List[i] != feed1List[i]).toBe(true);
            }
        });

    });

}());
