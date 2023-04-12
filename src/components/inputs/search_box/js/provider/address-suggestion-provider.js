import SuggestionProvider from "./suggestion-provider"
import axios from 'axios';
import urls from '../../../../../js/utils/urls'

class AddressSuggestionProvider extends SuggestionProvider {

    getSuggestions(text, count, callback) {
        let url = urls.suggestionUrlForAddress(text, count);
        axios.get(url)
            .then(function(response) {
                if(callback.onSuggestionsLoaded instanceof Function) {
                    callback.onSuggestionsLoaded(response.data);
                }
            }) .catch(function(error) {
                if(callback.onSuggestionsLoaded instanceof Function) {
                    callback.onError(error);
                }
            });
    }
}
export default AddressSuggestionProvider;