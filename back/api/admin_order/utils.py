from ..models import AdminOrder


def get_order_admin(pk):
    if len(AdminOrder.objects.filter(pk=pk)) > 0:
        return AdminOrder.objects.get(pk=pk)

    return None
