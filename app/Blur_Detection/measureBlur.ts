// this example uses axios
import axios from 'axios'
import { Url } from 'url';

const measureBlur = async(image:Url)=>{
    await axios.get('https://api.sightengine.com/1.0/check.json', {
        params: {
          'url': image,
          'models': 'quality',
          'api_user': '',
          'api_secret': '',
        }
      })
      .then(function (response) {
        // on success: handle response
        console.log(response.data);
        return response.data.quality;
      })
      .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
        return;
      });
}