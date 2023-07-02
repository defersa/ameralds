from ..models import Pattern


def get_rating_sum(items):
    items_count: int = len(items) or 1
    rating_sum: int = 0
    for item in items:
        rating_sum = rating_sum + dict(item)['score']
    return round(rating_sum / items_count, 2)


def get_pattern(pk):
    if len(Pattern.objects.filter(pk=pk)) > 0:
        return Pattern.objects.get(pk=pk)

    return None
