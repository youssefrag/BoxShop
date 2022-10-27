# Generated by Django 4.1.2 on 2022-10-26 19:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "totalPrice",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=7, null=True
                    ),
                ),
                (
                    "shippingAddress",
                    models.CharField(blank=True, max_length=200, null=True),
                ),
                ("isPaid", models.BooleanField(default=False)),
                ("isDelivered", models.BooleanField(default=False)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                ("name", models.CharField(blank=True, max_length=200, null=True)),
                ("brand", models.CharField(blank=True, max_length=200, null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True, default="placeholder.png", null=True, upload_to=""
                    ),
                ),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "price",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=7, null=True
                    ),
                ),
                ("countInStock", models.IntegerField(blank=True, default=0, null=True)),
                ("numReviews", models.IntegerField(blank=True, default=0, null=True)),
                (
                    "rating",
                    models.DecimalField(
                        blank=True, decimal_places=2, default=0, max_digits=7, null=True
                    ),
                ),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Profile",
            fields=[
                ("name", models.CharField(blank=True, max_length=200, null=True)),
                ("email", models.EmailField(blank=True, max_length=500, null=True)),
                ("username", models.CharField(blank=True, max_length=200, null=True)),
                ("created", models.DateTimeField(auto_now_add=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Review",
            fields=[
                ("rating", models.IntegerField(blank=True, default=0, null=True)),
                ("comment", models.TextField(blank=True, null=True)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.product"
                    ),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.profile"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OrderItem",
            fields=[
                ("quantity", models.IntegerField(blank=True, default=1, null=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.order"
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.product"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="order",
            name="profile",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="base.profile"
            ),
        ),
    ]