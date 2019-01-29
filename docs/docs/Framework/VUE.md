# VUE

<a href="demo/mindMap/zoomableCollapsibleTree.html?vue">Vue 2.0 + Vue Router + Vuex 思维导图</a>

# Axios模板

## Handling Errors
```javascript
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```
