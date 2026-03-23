using AutoMapper;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<Message, MessageViewModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
            .ForMember(dest => dest.SentAt, opt => opt.MapFrom(src => src.SentAt))
            .ForMember(dest => dest.Attachments, opt => opt.Ignore())
            .ForMember(dest => dest.ReceiverId, opt => opt.MapFrom(src => src.ReceiverId)); // Dodano ReceiverId

        CreateMap<CreateMessageViewModel, Message>()
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
            .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.OrderId))
            .ForMember(dest => dest.SentAt, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.SenderId, opt => opt.Ignore())
            .ForMember(dest => dest.Sender, opt => opt.Ignore())
            .ForMember(dest => dest.Order, opt => opt.Ignore());
    }
}
