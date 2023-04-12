<!--
    Суть задумки: поле с выпадающими подсказками
     - требует написания двух компонентов:
        - provider - класс, который подгружат подсказки с сервера, наследуется от SuggestionProvider
        - renderer - класс, который возвращает html-шаблон одной подсказки, наследуется от SuggestionRenderer
     - Виджет кидает событие suggestion-selected с аргументом объекта подсказки, в случае если подсказка выбрана мышью
     или по нажатию Enter

    Такая задумка позволяет отображать подсказки из разных источников в разном виде,
    сохраняя при этом управление стрелками, события по клавишам и остальную логику непосредственно виджета
    подсказок.
-->
<template>
    <div class="search-box">
        <div class="search-box-input-line">
            <input type="text" v-model="enteredText" v-on:keyup="onKeyUp" />
            <div class="search-box-button" v-on:click="onButtonClick(enteredText)">Поиск</div>
        </div>
        <div v-if="suggestionsShown" class="suggestions">
            <div class="error-message" v-if="errorMessageShown">{{errorMessage}}</div>
            <div v-for="(suggestion, index) in suggestions"
                 v-bind:key="index"
                 v-on:click="onSuggestionClick(suggestion)"
                 v-on:mouseenter="selectSuggestion(index)"
                 :class="suggestionClass(index)"
                 v-html="renderSuggestion(suggestion)" />
        </div>
    </div>
</template>

<script>
    import SuggestionRenderer from "./js/renderer/suggestion-renderer";
    import SuggestionProvider from "./js/provider/suggestion-provider";

    let DEFAULT_SUGGESTIONS_COUNT = 10;

    export default {
        name: "SearchBox",
        props: {
            initText: String,
            disabled: Boolean,
            suggestionRenderer: SuggestionRenderer,
            suggestionProvider: SuggestionProvider,
            defaultSuggestionCount: {
                required: false,
                default: DEFAULT_SUGGESTIONS_COUNT
            }
        },
        data() {
            return {
                suggestionsUrl: "/factor/suggestions",
                suggestionsShown: false,
                enteredText: '',
                suggestions: [],
                selectedSuggestionIndex: -1,
                errorMessageShown: false,
                errorMessage: ''
            }
        },
        watch: {
            initText: function(newVal) {
                this.enteredText = newVal;
            }
        },
        methods: {
            onKeyUp(e) {
                if(e.key === 'Enter') {
                    if(this.selectedSuggestionIndex !== -1) {
                        let currentSuggestion = this.suggestions[this.selectedSuggestionIndex];
                        this.onSuggestionClick(currentSuggestion);
                    } else if(this.suggestions.length > 0) {
                        this.onSuggestionClick(this.suggestions[0]);
                    } else {
                        this.hideSuggestions();
                    }
                    this.hideSuggestions();
                    return;
                }
                if(e.key === 'Escape') {
                    this.hideSuggestions();
                    return;
                }
                if(e.key === 'ArrowUp') {
                    this.moveSelectionUp();
                }
                if(e.key === 'ArrowDown') {
                    this.moveSelectionDown();
                }
                this.loadSuggestions();
            },

            moveSelectionDown() {
                if(this.selectedSuggestionIndex >= this.suggestions.length - 1) {
                    this.selectedSuggestionIndex = 0;
                } else {
                    this.selectedSuggestionIndex++;
                }
            },

            moveSelectionUp() {
                if(this.selectedSuggestionIndex <= 0) {
                    this.selectedSuggestionIndex = this.suggestions.length - 1;
                } else {
                    this.selectedSuggestionIndex--;
                }
            },

            selectSuggestion(index) {
                this.selectedSuggestionIndex = index;
            },

            loadSuggestions() {
                var component = this;
                this.suggestionProvider.getSuggestions(this.enteredText, DEFAULT_SUGGESTIONS_COUNT, {
                    onSuggestionsLoaded(data) {
                        component.errorMessageShown = false;
                        component.suggestions = data.suggestions;
                        component.suggestionsShown = true;

                        if(component.selectedSuggestionIndex > component.suggestions.length) {
                            component.selectedSuggestionIndex = -1;                        }
                    },

                    onError(error) {
                        component.showError("< Сервис подсказок недоступен >");
                    }
                });
            },

            showError(error) {
                this.suggestionsShown = true;
                this.suggestions = [];
                this.errorMessageShown = true;
                this.errorMessage = error;
            },
            emitSelectedEvent(text) {
                this.$emit("suggestion-selected", text)
            },
            suggestionUrlForAddress(address, count) {
                return this.suggestionsUrl + "?address="+address+"&count="+count;
            },
            hideSuggestions() {
                this.suggestionsShown = false;
                this.selectedSuggestionIndex = -1;
            },
            showSuggestions() {
              this.suggestionsShown = true;
            },
            onButtonClick(suggestion){
              // if ((this.suggestionsShown) && (this.enteredText === '')) {
              //   this.enteredText = suggestion.value;
              // }
              this.loadSuggestions();
            },
            onSuggestionClick(suggestion) {
                this.enteredText = suggestion.value;
                this.hideSuggestions();
                this.emitSelectedEvent(suggestion);
            },

            suggestionClass(index) {
                if(index === this.selectedSuggestionIndex) {
                    return "suggestion selected"
                } else {
                    return "suggestion"
                }
            },

            renderSuggestion(data) {
                return this.suggestionRenderer.renderSuggestion(data);
            }
        }
    }
</script>

<style scoped>

</style>