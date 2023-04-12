<template>
    <div>
        <div v-if="sparkEntrepreneur.phoneList">
            <h2>Список телефонов:</h2>
            <ExpandBox v-for="phone in sparkEntrepreneur.phoneList"
                       :header="'(' + phone.code + ') ' +phone.number" v-bind:key="phone.id">
                <div class="company-fields">
                    <DataField caption="Код" :value="phone.code"/>
                    <DataField caption="Телефон" :value="phone.number"/>
                    <DataField caption="Статус телефона" :value="phone.status"/>
                    <DataField caption="Дата проверки" :value="phone.verificationDate" :is-date="true"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.stateContractList">
            <h2>Сведения о госконтрактах: </h2>
            <div v-if="sparkEntrepreneur.stateContractList.law94List">
                <h2>Данные по тендерам и госконтрактам по ФЗ 94</h2>
                <ExpandBox v-for="law94 in sparkEntrepreneur.stateContractList.law94List"
                           :header="law94.year" v-bind:key="law94.id">
                    <div class="company-fields">
                        <DataField caption="Год" :value="law94.year"/>
                        <DataField caption="Число допусков к тендеру" :value="law94.tendersAdmittedNumber"/>
                        <DataField caption="Число не допусков к тендеру" :value="law94.tendersNotAdmittedNumber"/>
                        <DataField caption="Число выигрышей тендеров" :value="law94.tendersWinnerUmber"/>
                        <DataField caption="Число подписанных контрактов" :value="law94.contractsSignedNumber"/>
                        <DataField caption="Контрактов подписано на сумму, руб." :value="law94.contractsSum"/>
                    </div>
                </ExpandBox>
            </div>
            <div v-if="sparkEntrepreneur.stateContractList.law223List">
                <h2>Данные по тендерам и госконтрактам по 223 ФЗ</h2>
                <ExpandBox v-for="law223 in sparkEntrepreneur.stateContractList.law223List"
                           :header="law223.year" v-bind:key="law223.id">
                    <div class="company-fields">
                        <DataField caption="Год" :value="law223.year"/>
                        <DataField caption="Число допусков к тендеру" :value="law223.tendersAdmittedNumber"/>
                        <DataField caption="Число не допусков к тендеру" :value="law223.tendersNotAdmittedNumber"/>
                        <DataField caption="Число выигрышей тендеров" :value="law223.tendersWinnerUmber"/>
                        <DataField caption="Число подписанных контрактов" :value="law223.contractsSignedNumber"/>
                        <DataField caption="Контрактов подписано на сумму, руб." :value="law223.contractsSum"/>
                    </div>
                </ExpandBox>
            </div>
        </div>

        <div v-if="sparkEntrepreneur.federalTaxRegistration">
            <h2>Регистрация в ФНС </h2>
            <ExpandBox :header="sparkEntrepreneur.federalTaxRegistration.regAuthority">
                <DataField caption="Регистрирующий орган"
                           :value="sparkEntrepreneur.federalTaxRegistration.regAuthority"/>
                <DataField caption="Адрес регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistration.regAuthorityAddress"/>
                <DataField caption="Код регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistration.regAuthorityCode"/>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.federalTaxRegistrationCurrent">
            <h2>Регистрация в ФНС по месту нахождения</h2>
            <ExpandBox :header="sparkEntrepreneur.federalTaxRegistrationCurrent.regAuthority">
                <DataField caption="Регистрирующий орган"
                           :value="sparkEntrepreneur.federalTaxRegistrationCurrent.regAuthority"/>
                <DataField caption="Адрес регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistrationCurrent.regAuthorityAddress"/>
                <DataField caption="Код регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistrationCurrent.regAuthorityCode"/>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.federalTaxRegistrationPayment">
            <h2>Регистрация в налоговом органе </h2>
            <ExpandBox :header="sparkEntrepreneur.federalTaxRegistrationPayment.regAuthority">
                <DataField caption="Регистрирующий орган"
                           :value="sparkEntrepreneur.federalTaxRegistrationPayment.regAuthority"/>
                <DataField caption="Адрес регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistrationPayment.regAuthorityAddress"/>
                <DataField caption="Код регистрирующего органа"
                           :value="sparkEntrepreneur.federalTaxRegistrationPayment.regAuthorityCode"/>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.registrationCertificates">
            <h2>Свидетельство о регистрации</h2>
            <ExpandBox v-for="regCert in sparkEntrepreneur.registrationCertificates"
                       :header="regCert.series + ' ' + regCert.number" v-bind:key="regCert.id">
                <div class="company-fields">
                    <DataField caption="ИД" :value="regCert.id"/>
                    <DataField caption="Серия" :value="regCert.series"/>
                    <DataField caption="Номер" :value="regCert.number"/>
                    <DataField caption="Дата выдачи" :value="dateToText(regCert.issueDate)" :is-date="true"/>
                    <DataField caption="ГРН" :value="regCert.grn"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.okved2List">
            <h2>Список всех ОКВЭД2</h2>
            <ExpandBox v-for="okved in sparkEntrepreneur.okved2List"
                       :header="okved.code" v-bind:key="okved.code">
                <div class="company-fields">
                    <DataField caption="Код" :value="okved.id"/>
                    <DataField caption="Наименование" :value="okved.name"/>
                    <DataField caption="Признак основного ОКВЭД" :value="okved.main"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.bankruptcyArbitrationCases">
            <h2>Сведения об арбитражных делах о банкротстве: </h2>
            <ExpandBox v-for="bankruptcy in sparkEntrepreneur.bankruptcyArbitrationCases"
                       :header="bankruptcy.number" v-bind:key="bankruptcy.id">
                <div class="company-fields">
                    <DataField caption="Номер дела" :value="bankruptcy.number"/>
                    <DataField caption="Дата регистрации арбитражного дела" :value="bankruptcy.registrationDate"
                               :is-date="true"/>
                    <DataField caption="Статус" :value="bankruptcy.statusName"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.bankruptcyMessages">
            <h2>Список сообщений о банкротстве: </h2>
            <ExpandBox v-for="bankruptcyMes in sparkEntrepreneur.bankruptcyMessages"
                       :header="bankruptcyMes.caseNumber" v-bind:key="bankruptcyMes.id">
                <div class="company-fields">
                    <DataField caption="Номер дела" :value="bankruptcyMes.caseNumber"/>
                    <DataField caption="Дата публикации сообщения" :value="bankruptcyMes.date" :is-date="true"/>
                    <DataField caption="Дата принятия решения" :value="bankruptcyMes.decisionDate" :is-date="true"/>
                    <DataField caption="Тип сообщения" :value="bankruptcyMes.type"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.disqualifications">
            <h2>Данные о дисквалификации:</h2>
            <ExpandBox v-for="disqualification in sparkEntrepreneur.disqualifications"
                       :header="disqualification.registerNumber" v-bind:key="disqualification.id">
                <div class="company-fields">
                    <DataField caption="Номер записи в Реестре дисквалифицированных лиц"
                               :value="disqualification.registerNumber"/>
                    <DataField caption="Статья" :value="disqualification.article"/>
                    <DataField caption="Дата начала дисквалификации" :value="disqualification.startDate"
                               :is-date="true"/>
                    <DataField caption="Дата окончания дисквалификации" :value="disqualification.endDate"
                               :is-date="true"/>
                    <DataField caption="Срок дисквалификации" :value="disqualification.period"/>
                    <DataField caption="Наименование компании, в которой была дисквалификация"
                               :value="disqualification.disqualifiedInCompany"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.events">
            <h2>Событие мониторинга:</h2>
            <ExpandBox v-for="event in sparkEntrepreneur.events"
                       :header="event.eventDate" v-bind:key="event.id">
                <div class="company-fields">
                    <DataField caption="Дата события" :value="event.eventDate"/>
                    <DataField caption="Наименование типа события" :value="event.eventTypeDescription"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.includeInLists">
            <h2>Вхождение ИП в списки (реестры):</h2>
            <ExpandBox v-for="list in sparkEntrepreneur.includeInLists"
                       :header="list.comment" v-bind:key="list.id">
                <div class="company-fields">
                    <div v-if="list.addFields">
                        <h2>Наименование списка:</h2>
                        <ExpandBox v-for="field in list.addFields"
                                   :header="field.fieldName" v-bind:key="field.id">
                            <div class="company-fields">
                                <DataField caption="Наименование списка" :value="field.fieldName"/>
                                <DataField caption="Комментарий" :value="field.fieldValue"/>
                            </div>
                        </ExpandBox>
                    </div>
                    <DataField caption="ИД" :value="list.id"/>
                    <DataField caption="Комментарий" :value="list.comment"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.licenses">
            <h2>Список лицензий:</h2>
            <ExpandBox v-for="license in sparkEntrepreneur.licenses"
                       :header="license.number" v-bind:key="license.id">
                <div class="company-fields">
                    <DataField caption="Номер лицензии" :value="license.number"/>
                    <DataField caption="Дата выдачи" :value="license.issueDate" :is-date="true"/>
                    <DataField caption="Срок действия" :value="license.endDate" :is-date="true"/>
                    <DataField caption="Вид деятельности" :value="license.activityKind"/>
                    <DataField caption="Выдавший орган" :value="license.issuingAuthority"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.linkedOgrnipList">
            <h2>Связанный ОГРНИП:</h2>
            <ExpandBox v-for="linkedOgrnip in sparkEntrepreneur.linkedOgrnipList"
                       :header="linkedOgrnip.ogrnip" v-bind:key="linkedOgrnip.id">
                <div class="company-fields">
                    <DataField caption="ОГРНИП" :value="linkedOgrnip.ogrnip"/>
                    <DataField caption="Признак действующего ИП связанного ОГРНИП" :value="linkedOgrnip.acting"/>
                </div>
            </ExpandBox>
        </div>

        <div v-if="sparkEntrepreneur.pledge">
            <h2>Договор залога </h2>
            <div v-if="sparkEntrepreneur.pledge.pledgee">
                <h2>Залогодержатель:</h2>
                <DataField caption="Кол-во действующих договоров" :value="sparkEntrepreneur.pledge.pledgee.active"/>
                <DataField caption="Кол-во прекративших действие договоров"
                           :value="sparkEntrepreneur.pledge.pledgee.ceased"/>
            </div>
            <div v-if="sparkEntrepreneur.pledge.pledger">
                <h2>Залогодатель:</h2>
                <DataField caption="Кол-во действующих договоров" :value="sparkEntrepreneur.pledge.pledger.active"/>
                <DataField caption="Кол-во прекративших действие договоров"
                           :value="sparkEntrepreneur.pledge.pledger.ceased"/>
            </div>
        </div>

        <div v-if="sparkEntrepreneur.arbitrationCase">
            <h2>Арбитражные дела о банкротстве: </h2>
            <DataField caption="Общее кол-во арбитражных дел" :value="sparkEntrepreneur.arbitrationCase.total"/>
            <DataField caption="Кол-во рассматриваемых арбитражных дел"
                       :value="sparkEntrepreneur.arbitrationCase.considered"/>
            <DataField caption="Кол-во обжалуемых арбитражных дел" :value="sparkEntrepreneur.arbitrationCase.appealed"/>
            <DataField caption="Кол-во решений и постановлений"
                       :value="sparkEntrepreneur.arbitrationCase.decisionsAndRulings"/>
            <DataField caption="Кол-во завершенных арбитражных дел"
                       :value="sparkEntrepreneur.arbitrationCase.completed"/>
            <div v-if="sparkEntrepreneur.arbitrationCase.yearList">
                <h2>Сводные данные по арбитражным делам за определенный год </h2>
                <ExpandBox v-for="caseYear in sparkEntrepreneur.arbitrationCase.yearList"
                           :header="caseYear.year" v-bind:key="caseYear.id">
                    <div class="company-fields">
                        <DataField caption="Год" :value="caseYear.year"/>
                        <DataField caption="Кол-во дел а качестве истца" :value="caseYear.plaintiffCasesNumber"/>
                        <DataField caption="Сумма по делам в качестве исца" :value="caseYear.plaintiffSum"/>
                        <DataField caption="Кол-во дел а качестве ответчика"
                                   :value="caseYear.defendantCasesNumber"/>
                        <DataField caption="Сумма по делам в качестве ответчика" :value="caseYear.defendantSum"/>
                        <DataField caption="Кол-во дел а качестве третьего лица"
                                   :value="caseYear.thirdOrOtherPersonCasesNumber"/>
                    </div>
                </ExpandBox>
            </div>
        </div>

    </div>
</template>

<script>
    import DataField from "@/components/datafield/DataField";
    import ExpandBox from "@/components/layout/ExpandBox";

    export default {
        name: "EntrepreneurBody",
        components: {
            DataField,
            ExpandBox,
        },
        props: {
            'sparkEntrepreneur': Object,
        },
        methods: {
            dateToText(myDate){
                if (myDate === null) {
                    return  '';
                }
                return new Date(myDate).toLocaleDateString();
            },
        }
    }
</script>
