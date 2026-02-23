from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── App ────────────────────────────────────────────────────────────────────
    APP_NAME: str = "Entourage AV API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # ── Database ───────────────────────────────────────────────────────────────
    DATABASE_URL: str

    # ── Security ───────────────────────────────────────────────────────────────
    SECRET_KEY: str = "2d1d2151848947a946cc808ea29bcbf1bae3e5c9b366983d55cdeef5680cc25c"
    SESSION_MAX_AGE: int = 86400  # 24 hours in seconds

    # ── Admin credentials ──────────────────────────────────────────────────────
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"

    # ── CORS / Frontend URLs ───────────────────────────────────────────────────
    FRONTEND_URL: str = "http://localhost:3000"
    VERCEL_URL: str = "https://entourage-av.vercel.app"        # e.g. https://entourage-av.vercel.app
    CUSTOM_DOMAIN: str = ""     # e.g. https://www.entourageavrenovation.fr

    # ── File uploads ───────────────────────────────────────────────────────────
    UPLOAD_DIR: str = "static"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10 MB
    ALLOWED_EXTENSIONS: str = "jpg,jpeg,png,webp"

    # ── Railway S3 Object Storage ──────────────────────────────────────────────
    S3_ENDPOINT: str = "https://t3.storageapi.dev"       # https://t3.storageapi.dev
    S3_REGION: str = "auto"
    S3_BUCKET: str = "categorized-matchbox-mnbqbr"         # categorized-matchbox-mnbqbr
    S3_ACCESS_KEY: str = "tid_FHEsWFAbUrTbhaIaTr_LNBCeXziybhxqyHuVimv_wkUZuM_wdg"     # tid_FHEsWF...
    S3_SECRET_KEY: str = "tsec_rBO2b02IR9bnKdxikQtv-yAt5AUI_C76EtC5xv20kEyWSFxv7huyZ0W6swvMSTEK4l+eZt"     # your secret key (from Railway bucket dashboard)

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"

    @property
    def use_s3(self) -> bool:
        return bool(
            self.S3_ENDPOINT
            and self.S3_ACCESS_KEY
            and self.S3_SECRET_KEY
            and self.S3_BUCKET
        )

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # silently ignore any .env vars not declared here


settings = Settings()