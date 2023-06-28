from ..models.admin_order import BoughtAdminPattern, AdminOrder

ADMIN_MODELS = [BoughtAdminPattern, AdminOrder]

ADMIN_MODELS_NAMES = [item.__name__.lower() for item in ADMIN_MODELS]


class AdminDBRouter(object):
    def db_for_read(self, model, **hints):
        if model in ADMIN_MODELS:
            return 'moder'
        return None

    def db_for_write(self, model, **hints):
        if model in ADMIN_MODELS:
            return 'moder'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == 'default' and not model_name in ADMIN_MODELS_NAMES:
            return True

        if db == 'moder' and model_name in ADMIN_MODELS_NAMES:
            return True

        return False
