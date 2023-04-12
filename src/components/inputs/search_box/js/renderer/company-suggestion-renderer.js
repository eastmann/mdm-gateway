import SuggestionRenderer from "./suggestion-renderer";

class CompanySuggestionRenderer extends SuggestionRenderer{
    renderSuggestion(suggestion) {
        if(suggestion.data != null) {
            let data = suggestion.data;
            return `<div class="company-suggestion">
                    <div class="company-suggestion-name">${data.name}</div>
                    <div class="company-suggestion-address">${data.address}</div>
                </div>`
        } else {
            return ``;
        }
    }
}
export default CompanySuggestionRenderer;