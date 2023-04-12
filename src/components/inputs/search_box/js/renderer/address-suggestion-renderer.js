import SuggestionRenderer from "./suggestion-renderer";

class AddressSuggestionRenderer extends SuggestionRenderer{
    renderSuggestion(suggestion) {
        return `${suggestion.data.address}`
    }
}
export default AddressSuggestionRenderer;