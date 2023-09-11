package br.com.cofincp.enums;

public enum ApiUri {
    BUSINESS("business"),
    DISCOUNT("discount"),
    FIXED_COST("fixed_cost"),
    LOGS("logs"),
    PRODUCT("product"),
    SUPPLIER("supplier"),
    SUPPLY("supply");

    private final String uri;

    ApiUri(String uri) {
        this.uri = uri;
    }

    public String getUri() {
        return uri;
    }
}
