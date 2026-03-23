using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;

namespace Rado.Dyntro.Server.Profile;
public class OrderProfile : AutoMapper.Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderViewModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.Topic, opt => opt.MapFrom(src => src.Topic))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
            .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority))
            .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.ReceiverId, opt => opt.MapFrom(src => src.ReceiverId));

        CreateMap<OrderViewModel, Order>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.Topic, opt => opt.MapFrom(src => src.Topic))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
            .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority))
            .ForMember(dest => dest.Date, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.User, opt => opt.Ignore())
            .ForMember(dest => dest.Receiver, opt => opt.Ignore());


        CreateMap<Order, OrderDetailsViewModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.Topic, opt => opt.MapFrom(src => src.Topic))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))

               
                .ForMember(dest => dest.ContactFirstName, opt => opt.MapFrom((src, dest, destMember, context) =>
                {
                    var currentUserId = (Guid)context.Items["CurrentUserId"];
                    return src.UserId == currentUserId ? src.Receiver?.FirstName : src.User?.FirstName;
                }))
                .ForMember(dest => dest.ContactLastName, opt => opt.MapFrom((src, dest, destMember, context) =>
                {
                    var currentUserId = (Guid)context.Items["CurrentUserId"];
                    return src.UserId == currentUserId ? src.Receiver?.LastName : src.User?.LastName;
                }))
                .ForMember(dest => dest.ContactEmail, opt => opt.MapFrom((src, dest, destMember, context) =>
                {
                    var currentUserId = (Guid)context.Items["CurrentUserId"];
                    return src.UserId == currentUserId ? src.Receiver?.Email : src.User?.Email;
                }));
    }
}
