from rest_framework import serializers
from .models import User, Venue, Event, Customer, Ticket


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Override the default create() method to handle password encryption
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class VenueSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.HyperlinkedRelatedField(
        view_name='event_detail',
        many=True,
        read_only=True
    )

    class Meta:
        model = Venue
        fields = ('id', 'name', 'address', 'city', 'state',
                  'zip_code', 'capacity', 'indoor', 'outdoor', 'photo_url', 'events')


class EventSerializer(serializers.HyperlinkedModelSerializer):
    venues = serializers.HyperlinkedRelatedField(
        view_name='venue_detail',
        many=True,
        read_only=True
    )

    customers = serializers.HyperlinkedRelatedField(
        view_name="customer_detail",
        many=True,
        read_only=True
    )

    tickets = serializers.HyperlinkedRelatedField(
        view_name="ticket_detail",
        many=True,
        read_only=True
    )

    class Meta:
        model = Event
        fields = ('id', 'name', 'datetime', 'photo_url',
                  'venues', 'customers', 'tickets')


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.HyperlinkedRelatedField(
        view_name="event_detail",
        many=True,
        read_only=True
    )

    tickets = serializers.HyperlinkedRelatedField(
        view_name="ticket_detail",
        many=True,
        read_only=True
    )

    class Meta:
        model = Customer
        fields = ('id', 'name', 'address', 'city', 'state',
                  'zip_code', 'purchases', 'photo_url', 'events', 'tickets')


class TicketSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.HyperlinkedRelatedField(
        view_name="event_detail",
        many=True,
        read_only=True
    )

    customers = serializers.HyperlinkedRelatedField(
        view_name="customer_detail",
        many=True,
        read_only=True
    )

    class Meta:
        model = Ticket
        fields = ('id', 'price', 'seating', 'number_of_tickets',
                  'tickets_sold', 'events', 'customers')
