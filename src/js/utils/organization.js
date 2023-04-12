export default {
    companyName(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.shortName
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.fullNameRus;
        }

        return null;
    },

    companyFullName(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.fullName
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.fullNameRus;
        }

        return null;
    },

    companyStatus(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.status
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.status;
        }

        return null;
    },

    companyStatusAndDate(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.status + " / " + (organization.company.statusCode === 24 ? new Date().toISOString().split('T')[0] : new Date(organization.company.statusDate).toISOString().split('T')[0])
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.status + " / " + (organization.entrepreneur.statusCode === 24 ? new Date().toISOString().split('T')[0] : new Date(organization.entrepreneur.statusDate).toISOString().split('T')[0])
        }

        return null;
    },

    companyAddress(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.address
        }

        return null;
    },

    companyDateReg(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.dateReg
        }

        return null;
    },

    ogrn(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.ogrn;
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.ogrnip;
        }

        return null;
    },

    inn(organization) {
        if (organization == null) return null;
        if (organization.company != null) {
            return organization.company.inn;
        }

        if (organization.entrepreneur != null) {
            return organization.entrepreneur.inn;
        }

        return null;
    },
}