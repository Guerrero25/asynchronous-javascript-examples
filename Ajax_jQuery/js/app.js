(function () {
  const form = document.querySelector('.search-form')
  const searchField = document.querySelector('#search-keyword')
  let searchedForText
  const responseContainer = document.querySelector('#response-container')

  function addImage (data) {
    let htmlContent = ''

    if (data && data.results && data.results[0]) {
      const firstImage = data.results[0]
      htmlContent = `<figure class="image-top">
          <img src="${firstImage.urls.regular}" alt="${searchedForText}">
          <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`
    } else {
      htmlContent = '<div class="error">No images availadle</div>'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent)
  }

  function addArticles (data) {
    let htmlContent = ''

    if (data.response && data.response.docs && data.response.docs.length > 1) {
      htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}"> ${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
          </li>`).join('') + '</ul>'
    } else {
      htmlContent = '<div class="error">No articles availadle</div>'
    }

    responseContainer.insertAdjacentHTML('beforeend', htmlContent)
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    responseContainer.innerHTML = ''
    searchedForText = searchField.value

    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        Authorization: 'Client-ID cfa940013b1dad0b1009462643b1f8f6dcd18a2f5ba1165988c54476e57eacc0'
      }
    }).done(addImage)

    $.ajax({
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d38430c0080d4c5eaf0710f3b32eb0f1`
    }).done(addArticles)
  })
})()
