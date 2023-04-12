<template>
    <div>
        <hr v-if="sparkCompany.affiliatedCompanyFcsmList || sparkCompany.affiliatedCompanyRosstatList || sparkCompany.affiliatedCompanyEgrulList">
        <div v-if="sparkCompany.affiliatedCompanyEgrulList">
            <ExpandBox header="Дочерние компании (по данным ЕГРЮЛ)" header-class="big-expand-header">
            <ExpandBox v-for="affCompany in sparkCompany.affiliatedCompanyEgrulList"
                       :header="affCompany.name" v-bind:key="affCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="affCompany.address"/>
                    <DataField caption="Полное наименование" :value="affCompany.fullName"/>
                    <DataField caption="ИНН" :value="affCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="affCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="affCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="affCompany.okpo"/>
                    <DataField caption="Наименование ОПФ" :value="affCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="affCompany.okato"/>
                    <DataField caption="Руководитель" :value="affCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="affCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="affCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="affCompany.sharePartRur"/>
                    <DataField caption="Запись создана" :value="affCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="affCompany.changeDate"/>
                    <DataField caption="Данные актуальны на" :value="affCompany.affCompanyEgrulActualDate"
                               :is-date="true"/>
                </div>
            </ExpandBox>
            </ExpandBox>
        </div>
        <div v-if="sparkCompany.affiliatedCompanyFcsmList">
            <ExpandBox header="Дочерние компании (по данным анкет эмитентов)" header-class="big-expand-header">
            <ExpandBox v-for="affCompany in sparkCompany.affiliatedCompanyFcsmList"
                       :header="affCompany.name" v-bind:key="affCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="affCompany.address"/>
                    <DataField caption="Полное наименование" :value="affCompany.fullName"/>
                    <DataField caption="ИНН" :value="affCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="affCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="affCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="affCompany.okpo"/>
                    <DataField caption="Статус" :value="affCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="affCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="affCompany.okato"/>
                    <DataField caption="Запись создана" :value="affCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="affCompany.changeDate"/>
                    <DataField caption="Руководитель" :value="affCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="affCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="affCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="affCompany.sharePartRur"/>
                    <DataField caption="Данные актуальны на" :value="sparkCompany.affCompanyFcsmActualDate" :is-date="true"/>
                </div>
            </ExpandBox>
            </ExpandBox>
        </div>
        <div v-if="sparkCompany.affiliatedCompanyRosstatList">
            <ExpandBox header="Дочерние компании (по данным Росстат)" header-class="big-expand-header">
            <ExpandBox v-for="affCompany in sparkCompany.affiliatedCompanyRosstatList"
                       :header="affCompany.name" v-bind:key="affCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="affCompany.address"/>
                    <DataField caption="Полное наименование" :value="affCompany.fullName"/>
                    <DataField caption="ИНН" :value="affCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="affCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="affCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="affCompany.okpo"/>
                    <DataField caption="Наименование ОПФ" :value="affCompany.okopfName"/>
                    <DataField caption="Статус" :value="affCompany.statusText"/>
                    <DataField caption="ОКАТО" :value="affCompany.okato"/>
                    <DataField caption="Запись создана" :value="affCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="affCompany.changeDate"/>
                    <DataField caption="Руководитель" :value="affCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="affCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="affCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="affCompany.sharePartRur"/>
                    <DataField caption="Данные актуальны на" :value="sparkCompany.affCompanyRosstatActualDate"
                               :is-date="true"/>
                </div>
            </ExpandBox>
            </ExpandBox>
        </div>
        <hr v-if="sparkCompany.branchList || sparkCompany.branchEgrulList || sparkCompany.branchRosstatList">
        <div v-if="sparkCompany.branchList">
            <ExpandBox header="Филиалы" header-class="big-expand-header">
            <ExpandBox v-for="branchCompany in sparkCompany.branchList"
                       :header="branchCompany.name" v-bind:key="branchCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="branchCompany.address"/>
                    <DataField caption="Полное наименование" :value="branchCompany.fullName"/>
                    <DataField caption="ИНН" :value="branchCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="branchCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="branchCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="branchCompany.okpo"/>
                    <DataField caption="Статус" :value="branchCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="branchCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="branchCompany.okato"/>
                    <DataField caption="Руководитель" :value="branchCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="branchCompany.managerInn"/>
                    <DataField caption="Дата открытия филиала" :is-date="true" :value="branchCompany.openDate"/>
                    <DataField caption="Окончание срока действия доверенности" :is-date="true"
                               :value="branchCompany.termDate"/>
                    <DataField caption="Доля акций (%)" :value="branchCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="branchCompany.sharePartRur"/>
                    <DataField caption="Запись создана" :value="branchCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="branchCompany.changeDate"/>
                </div>
            </ExpandBox>
            </ExpandBox>
        </div>
        <div v-if="sparkCompany.branchEgrulList">
            <ExpandBox header="Филиалы (по данным ЕГРЮЛ)" header-class="big-expand-header">
            <UnexpandBox v-for="branchCompany in sparkCompany.branchEgrulList"
                       :header="branchCompany.address" v-bind:key="branchCompany.id">
            </UnexpandBox>
            </ExpandBox>
        </div>
        <div v-if="sparkCompany.branchRosstatList">
            <ExpandBox header="Филиалы (по данным Росстат)" header-class="big-expand-header">
            <ExpandBox v-for="branchCompany in sparkCompany.branchRosstatList"
                       :header="branchCompany.name" v-bind:key="branchCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="branchCompany.address"/>
                    <DataField caption="Полное наименование" :value="branchCompany.fullName"/>
                    <DataField caption="ИНН" :value="branchCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="branchCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="branchCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="branchCompany.okpo"/>
                    <DataField caption="Статус" :value="branchCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="branchCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="branchCompany.okato"/>
                    <DataField caption="Запись создана" :value="branchCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="branchCompany.changeDate"/>
                    <DataField caption="Руководитель" :value="branchCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="branchCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="branchCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="branchCompany.sharePartRur"/>
                </div>
            </ExpandBox>
            </ExpandBox>
        </div>

        <hr v-if="sparkCompany.coownerFcsmList || sparkCompany.coownerRosstatList || sparkCompany.coownerEgrulList">
        <ExpandBox header="Совладельцы (по данным анкет эмитентов)" header-class="big-expand-header" v-if="sparkCompany.coownerFcsmList">
            <ExpandBox v-for="coownerCompany in sparkCompany.coownerFcsmList"
                       :header="coownerCompany.name" v-bind:key="coownerCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="coownerCompany.address"/>
                    <DataField caption="Полное наименование" :value="coownerCompany.fullName"/>
                    <DataField caption="ИНН" :value="coownerCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="coownerCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="coownerCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="coownerCompany.okpo"/>
                    <DataField caption="Статус" :value="coownerCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="coownerCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="coownerCompany.okato"/>
                    <DataField caption="Запись создана" :value="coownerCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="coownerCompany.changeDate"/>
                    <DataField caption="Руководитель" :value="coownerCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="coownerCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="coownerCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="coownerCompany.sharePartRur"/>
                </div>
            </ExpandBox>
        </ExpandBox>
        <ExpandBox header="Совладельцы (по данным ЕГРЮЛ)" header-class="big-expand-header" v-if="sparkCompany.coownerEgrulList">
            <ExpandBox v-for="coownerCompany in sparkCompany.coownerEgrulList"
                       :header="coownerCompany.name" v-bind:key="coownerCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="coownerCompany.address"/>
                    <DataField caption="Полное наименование" :value="coownerCompany.fullName"/>
                    <DataField caption="ИНН" :value="coownerCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="coownerCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="coownerCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="coownerCompany.okpo"/>
                    <DataField caption="Статус" :value="coownerCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="coownerCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="coownerCompany.okato"/>
                    <DataField caption="Руководитель" :value="coownerCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="coownerCompany.managerInn"/>
                    <DataField caption="Дата потери правоспособности физ. лица" :is-date="true"
                               :value="sparkCompany.legalCapacityEndDate"/>
                    <DataField caption="Доля акций (%)" :value="coownerCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="coownerCompany.sharePartRur"/>
                    <DataField caption="Тип совладельца" :value="coownerCompany.coownerType"/>
                    <DataField caption="Страна" :value="coownerCompany.countryName"/>
                    <DataField caption="Данные актуальны на" :value="sparkCompany.coownerEgrulActualDate" :is-date="true"/>
                    <DataField caption="Запись создана" :value="coownerCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="coownerCompany.changeDate"/>
                </div>
                <div class="pledge-block" v-if="coownerCompany.pledges">
                    <h3 class="pledge-list-header">Договоры залога</h3>
                    <ExpandBox v-for="pledge in coownerCompany.pledges"
                               :header="pledge.grn" v-bind:key="pledge.id">
                        <div class="company-fields">
                            <DataField caption="ФИО Нотариуса" :value="pledge.notaryFio"/>
                            <DataField caption="Срок обременения" :value="pledge.term"/>
                            <DataField caption="Номер договора" :value="pledge.contractNumber"/>
                            <DataField caption="Дата заключения договора" :is-date="true"
                                       :value="pledge.contractDate"/>
                            <DataField caption="Дата регистрации" :is-date="true"
                                       :value="pledge.registrationDate"/>
                        </div>
                        <div v-if="pledge.pledgeeName || pledge.pledgeSparkId || pledge.pledgeeInn || pledge.pledgeeOrgn">
                            <h3 class="pledgee-header">Информация о залогодержателе</h3>
                            <div class="company-fields">
                                <DataField caption="Имя" :value="pledge.pledgeeName"/>
                                <DataField caption="Идентификатор СПАРК" :value="pledge.pledgeeSparkId"/>
                                <DataField caption="ИНН" :value="pledge.pledgeeInn"/>
                                <DataField caption="ОГРН" :value="pledge.pledgeeOrgn"/>
                            </div>
                        </div>
                    </ExpandBox>
                </div>
            </ExpandBox>
        </ExpandBox>
        <ExpandBox header="Совладельцы (по данным Росстат)" header-class="big-expand-header" v-if="sparkCompany.coownerRosstatList">
            <ExpandBox v-for="coownerCompany in sparkCompany.coownerRosstatList"
                       :header="coownerCompany.name" v-bind:key="coownerCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="coownerCompany.address"/>
                    <DataField caption="Полное наименование" :value="coownerCompany.fullName"/>
                    <DataField caption="ИНН" :value="coownerCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="coownerCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="coownerCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="coownerCompany.okpo"/>
                    <DataField caption="Статус" :value="coownerCompany.statusText"/>
                    <DataField caption="Наименование ОПФ" :value="coownerCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="coownerCompany.okato"/>
                    <DataField caption="Запись создана" :value="coownerCompany.createDate"/>
                    <DataField caption="Запись обновлена" :value="coownerCompany.changeDate"/>
                    <DataField caption="Руководитель" :value="coownerCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="coownerCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="coownerCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="coownerCompany.sharePartRur"/>
                    <DataField caption="Данные актуальны на" :value="sparkCompany.coownerRosstatActualDate" :is-date="true"/>
                </div>
            </ExpandBox>
        </ExpandBox>

        <ExpandBox header="Некоммерческие организации компании (по данным Росстат)" header-class="big-expand-header" v-if="sparkCompany.nonProfitOrgRosstatList">
            <ExpandBox v-for="nonProfitCompany in sparkCompany.nonProfitOrgRosstatList"
                       :header="nonProfitCompany.name" v-bind:key="nonProfitCompany.id">
                <div class="company-fields">
                    <DataField caption="Адрес" :value="nonProfitCompany.address"/>
                    <DataField caption="Полное наименование" :value="nonProfitCompany.fullName"/>
                    <DataField caption="ИНН" :value="nonProfitCompany.inn"/>
                    <DataField caption="Идентификатор СПАРК" :format=false :value="nonProfitCompany.sparkId"/>
                    <DataField caption="ОГРН" :value="nonProfitCompany.ogrn"/>
                    <DataField caption="ОКПО" :value="nonProfitCompany.okpo"/>
                    <DataField caption="Наименование ОПФ" :value="nonProfitCompany.okopfName"/>
                    <DataField caption="ОКАТО" :value="nonProfitCompany.okato"/>
                    <DataField caption="Руководитель" :value="nonProfitCompany.manager"/>
                    <DataField caption="Код ИНН руководителя" :value="nonProfitCompany.managerInn"/>
                    <DataField caption="Доля акций (%)" :value="nonProfitCompany.sharePart"/>
                    <DataField caption="Доля акций (руб)" :value="nonProfitCompany.sharePartRur"/>
                    <DataField caption="Запись создана" :is-date="true" :value="nonProfitCompany.createDate"/>
                    <DataField caption="Запись обновлена" :is-date="true" :value="nonProfitCompany.changeDate"/>
                </div>
            </ExpandBox>
        </ExpandBox>
    </div>
</template>

<script>
    import DataField from "@/components/datafield/DataField";
    import ExpandBox from "@/components/layout/ExpandBox";
    import UnexpandBox from "@/components/layout/UnexpandBox";

    export default {
        name: "CompanyBody",
        components: {
            DataField,
            ExpandBox,
            UnexpandBox,
        },
        props: {
            'sparkCompany': Object,
        },
    }
</script>

<style>

</style>
