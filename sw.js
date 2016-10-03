// In a service worker, self refers to the ServiceWorkerGlobalScope object: the service worker itself.

// The fetch event is fired every time the browser makes a request for a resource.
self.addEventListener('fetch', function(event) {
    // respondWith() function tells the Service Worker what to return to the browser.
    event.respondWith(
        // Open an existing cache called 'offline' or create a new one
        // Once that promise returns, pass the content of that cache into the callback
        // Note, you can have many isolated caches
        caches.open('offline').then(function(cache) {
            // cache.match will take the event request and return a promise with the response of the request
            return cache.match(event.request).then(function (response) {
                // Return response from cache('offline') if it exists, otherwise make a new fetch request and put the response on the cache
                return response || fetch(event.request).then(function(response) {
                    // To allow for efficient memory usage, you can only read a response/request's body once. In the code above, .clone() is used to create additional copies that can be read separately.
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
