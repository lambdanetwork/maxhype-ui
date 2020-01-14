const elem = document.createElement('div');
    elem.id = "asdf";
    document.body.appendChild(elem);

    const urls = ['https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'];
    
    // @ts-ignore
    setTimeout(() => {
      InitFetch(urls, 130000, (currentDownloadedSize) => {
        // update render
        RenderLoader(currentDownloadedSize, "asdf")
      });
    }, 10000)

    function InitFetch(urls: string[], totalSize: number, cb:Function){
      let currrentDownloadedSize = 0;
      cb(currrentDownloadedSize)
      urls.forEach(async url => {
        try{
          const [_, size] = await fetchOneFileAndGetSize(url);
          currrentDownloadedSize = currrentDownloadedSize + size;
          const percentage = calculatePercentage(currrentDownloadedSize, totalSize)
          cb(percentage)
        } catch(err){
          throw new Error(err);
        }
      });
    }

    function calculatePercentage(current, total){
      let p =  (current/ total) * 100;
      if(p > 100) {p = 100};
      return Math.round(p)
    }

    function RenderLoader(currentDownloadedSize: number, elementId: string){
      const elem = document.getElementById(elementId);
      if(elem) {
        elem.innerHTML = String(currentDownloadedSize); 
      }
    }

    

    async function fetchOneFileAndGetSize(url:string): Promise<[Blob | undefined, number ]>{
      return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => {
          if(res.ok) return res.blob();
          else reject(res);
          return Promise.resolve(undefined)
        })
        .then(res => {
          if(!res) return resolve([undefined, 0]);
          resolve([res, (res as Blob).size])
        })
        .catch(reject)
      })
    }