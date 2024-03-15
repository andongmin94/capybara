from django.db import migrations, models
from django.db.models import Count, Max


def remove_duplicate_options(apps, schema_editor):
    deposit_options = apps.get_model("finlife", "DepositOptions")
    identity_fields = (
        "product_id",
        "dcls_month",
        "fin_prdt_cd",
        "intr_rate_type_nm",
        "save_trm",
    )
    duplicates = (
        deposit_options.objects.values(*identity_fields)
        .annotate(keep_id=Max("id"), row_count=Count("id"))
        .filter(row_count__gt=1)
    )

    for duplicate in duplicates.iterator():
        identity = {field: duplicate[field] for field in identity_fields}
        deposit_options.objects.filter(**identity).exclude(
            id=duplicate["keep_id"]
        ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("finlife", "0002_delete_installmentsproducts"),
    ]

    operations = [
        migrations.RunPython(
            remove_duplicate_options,
            reverse_code=migrations.RunPython.noop,
        ),
        migrations.AddConstraint(
            model_name="depositoptions",
            constraint=models.UniqueConstraint(
                fields=(
                    "product",
                    "dcls_month",
                    "fin_prdt_cd",
                    "intr_rate_type_nm",
                    "save_trm",
                ),
                name="unique_deposit_product_option",
            ),
        ),
    ]
